import { camelCase } from "change-case";
import { inspect } from "node:util";
import run, {
  astToString,
  type ObjectSubtype,
  type SchemaObject,
} from "openapi-typescript";

// Docker docs currently seem to be using OpenAPI 2.0 so we will convert it
// to OpenAPI 3.0 using https://github.com/Mermade/openapi-typescript

const contractUrl =
  "https://docs.docker.com/reference/api/engine/version/v1.50.yaml";

const contract = await fetch(
  `https://converter.swagger.io/api/convert?url=${contractUrl}`,
).then((res) => res.json());

const nodes = await run(contract, {
  transform(schemaObject, options) {
    if (schemaObject.type !== "array" && schemaObject.type !== "object") {
      return undefined;
    }

    if (
      options.path?.startsWith("#/components/schemas/") ||
      options.path?.endsWith("/post/requestBody/application~1json") ||
      options.path?.endsWith("/post/requestBody/application~1octet-stream") ||
      options.path?.endsWith("/post/requestBody/text~1plain") ||
      options.path?.endsWith("/responses/200/content/application~1json") ||
      options.path?.endsWith("/responses/200/content/text~1plain")
    ) {
      if (
        options.path.startsWith(
          "#/paths/~1networks~1create/post/requestBody/application~1json",
        )
      ) {
        console.log("transforming", options.path);
        console.log(
          "transforming",
          inspect(schemaObject, { depth: null, colors: true }),
        );
        transformSchema(schemaObject);
      }
    } else {
      console.log(options.path, "missed");
      console.log(inspect(schemaObject, { depth: null, colors: true }));
    }

    return undefined;
  },
});
await Bun.write("alchemy/src/docker/api/types.ts", astToString(nodes));

function transformSchema(schemaObject: SchemaObject) {
  if (schemaObject.type === "object") {
    camelCaseObjectSchema(schemaObject);
  } else if (schemaObject.type === "array") {
    // @ts-ignore
    if (schemaObject.items?.type === "object") {
      camelCaseObjectSchema(schemaObject.items as SchemaObject);
    }
  }
}

function camelCaseArraySchema(arr: SchemaObject) {
  if (arr.type !== "array") {
    return arr;
  }

  if (arr.items && "type" in arr.items && arr.items.type === "object") {
    camelCaseObjectSchema(arr.items);
  }

  if (arr.example) {
    if (Array.isArray(arr.example)) {
      arr.example = arr.example.map((example) =>
        camelCaseObject(example, true),
      );
    } else if (typeof arr.example === "object") {
      arr.example = camelCaseObject(arr.example, true);
    } else {
      console.warn(
        `WEIRD: Example is not an array: ${JSON.stringify(arr.example)}`,
      );
    }
  }

  return arr;
}

function camelCaseObjectSchema(obj: SchemaObject) {
  if (obj.type !== "object") {
    return obj;
  }

  const newProperties: ObjectSubtype["properties"] = {};
  for (const key in obj.properties) {
    const newKey = camelCase(key);
    newProperties[newKey] = obj.properties[key];
    const schema = newProperties[newKey];

    // Track original property name, we will use the summary property just for documentation,
    // @ts-ignore: as we want to add it anywhere and just let openapi-typescript handle it
    if (!schema.summary?.includes("@api \`")) {
      // @ts-ignore: as we want to add it anywhere and just let openapi-typescript handle it
      schema.summary = `@api \`${key}\``;
    }

    if (!("type" in schema)) continue;
    if (schema.type === "object") {
      camelCaseObjectSchema(schema);
    } else if (schema.type === "array") {
      camelCaseArraySchema(schema);
    }
  }
  obj.properties = newProperties;

  if (obj.required) {
    obj.required = obj.required.map((key) => camelCase(key));
  }

  if (obj.example) {
    obj.example = camelCaseObject(obj.example, true);
  }

  return obj;
}

function camelCaseObject(obj: Record<string, any>, recursive = false) {
  const newObj = {};

  if (Array.isArray(obj)) {
    return obj.map((item) => camelCaseObject(item, recursive));
  }

  if (typeof obj !== "object") {
    return obj;
  }

  for (const key in obj) {
    const newKey = camelCase(key);
    newObj[newKey] = obj[key];
    if (recursive) {
      if (Array.isArray(obj[key])) {
        newObj[newKey] = obj[key].map((item) =>
          camelCaseObject(item, recursive),
        );
      } else if (typeof obj[key] === "object") {
        newObj[newKey] = camelCaseObject(obj[key], recursive);
      }
    }
  }
  return newObj;
}

// const openapiYaml = await fetch(openapiUrl);
// const openapiYamlText = await openapiYaml.text();
// const openapiYamlObject = parse(openapiYamlText) as OpenAPIV2.Document;

// console.log(openapiYamlObject.definitions);

// for await (const file of new Bun.Glob(`${srcDir}/**/*.ts`).scan()) {
//   const fileText = await Bun.file(file).text();
//   const match = fileText.match(/\/\/!INJECT:PROPERTIES! (.*)/);
//   if (match) {
//     console.log(`Injecting properties for ${match[1]} in ${file}`);
//   }
//   const newFileText = fileText.replace(
//     /^\s*\/\/!INJECT:PROPERTIES! (.*)$(?:(?:.|\n)*?(?:\/\/!END_INJECT:PROPERTIES! \1)$)?/m,
//     (_, p1) => {
//       const definition = openapiYamlObject.definitions?.[p1];
//       if (!definition) {
//         throw new Error(
//           `IMPOSSIBLE: Definition ${p1} not found in OpenAPI YAML.`,
//         );
//       }

//       const propertiesText = Object.entries(definition.properties ?? {})
//         .map(([key, type]) => {
//           console.log(key, type);

//           return [
//             type.description
//               ? [
//                   "  /**",
//                   `   * ${type.description.trim().replaceAll(/\n/gm, "\n   * ")}`,
//                   "   */",
//                 ]
//               : [],
//             `  ${key}: ${type.type};`,
//           ]
//             .flat()
//             .join("\n");
//         })
//         .join("\n");

//       return `  //!INJECT:PROPERTIES! ${p1}
// ${propertiesText}
//   //!END_INJECT:PROPERTIES! ${p1}`;
//     },
//   );
//   await Bun.write(file, newFileText);
// }
