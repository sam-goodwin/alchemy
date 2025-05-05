---
order: 3
---

# Replace

Some Cloud Resources do not allow all properties to be updated, e.g. an AWS DynamoDB Table's name cannot change after creation.

To support changing these properties, an Alchemy Resource's lifecycle handler can call `this.replace()` to mark the resource for deletion and then create a new one.

Alchemy will delete the replaced resource once it is safe to do so.

## Trigger Replacement

During the `"update"` phase of your Resource lifecycle handler, check for cases that cannot be updated and then call `this.replace()` before creating a new instance.

For example, the following code detects that our Table's name has changed.

```ts
if (this.phase === "update") {
  // if the table's name has changed, we must replace
  if (props.name !== this.props.name) {
    // signal to alchemy that this resource is being replaced
    this.replace();
  }
}
```

> [!NOTE]
> `this.props` contains the `props` of when this resource was originaly created or last updated.

After triggering replacement, your Resource lifecycle handler should proceed through the typical creation flow.

```ts
// continue with the ordinary create flow
const table = await createNewTable(props);
return this(table)
```

## Replacement Lifecycle

A replaced Resource will be deleted after all `create` and `update` operations complete when you call `app.finalize()`:

```ts
const app = await alchemy("my-app");

// resoruces

await app.finalize(); // <- will finalize all resoruces, including deleting repalced ones
```

It is not deleted immediately because Alchemy must guarantee that all references to the old Resource have been updated.

Consider the following example:
```ts
const table = await Table("table", { name: "my-table" });

const function = await Function("function", {
  env: {
    TABLE_NAME: table.tableName
  }
});
```

If we deleted the `table` before updating the `function`, the `TABLE_NAME` reference would be left "dangling". 

In some cases, the API will even reject its deletion, leading to a "bricked" Stack that can't proceed.

To avoid this, Alchemy delays deletion until after the application state has flushed.

## Full Example

This simple example demonstrates a pattern for replaceable resources. 

```ts
const Table = Resource(
  "dynamodb::Table",
  async function(this, id, props) {
    if (this.phase === "delete") {
      // call delete APIs
      await deleteTable(this.output)
      return this.destroy();
    } else if (this.phase === "update") {
      if (props.name !== this.props.name) {
        // Uh oh! We need to replace this table because the name changed
        this.replace();
      } else {
        // we can safely update the table, let's just call the API
        const table = await updateTable(props);
        // and then return early
        return this(table);
      }
    }
    // create a new table during `"create"` or when 
    const table = await createTable(props);
    return this(table);
  }
);
```


## Limitations

> [!CAUTION]
> You cannot replace a Resource that has child resources.
> 
> ```ts
> const MyResource = Resource(
>   "MyResource",
>   async function(this, id, props) {
>     if (this.phase === "update" && props.name !== this.props.name) {
>       // will throw because this Resource has a child, `table` Resource.
>       this.replace();
>     }
>     const table = await Table("child");
>     return this({
>       tableName: table.tableName
>     });
>   }
> );
> ```

> [!NOTE]
> This constraint may be relaxed later.
