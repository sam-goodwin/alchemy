import run, { astToString } from "openapi-typescript";

// Docker docs currently seem to be using OpenAPI 2.0 so we will convert it
// to OpenAPI 3.0 using https://github.com/Mermade/openapi-typescript

const contractUrl =
  "https://docs.docker.com/reference/api/engine/version/v1.50.yaml";

const contract = await fetch(
  `https://converter.swagger.io/api/convert?url=${contractUrl}`,
).then((res) => res.json());

const nodes = await run(contract);
await Bun.write("alchemy/src/docker/api/types.ts", astToString(nodes));

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
