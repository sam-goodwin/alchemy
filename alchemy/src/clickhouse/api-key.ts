import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { secret, type Secret } from "../secret.ts";
import { diff } from "../util/diff.ts";
import {
  createClickhouseApi,
  type ApiKey as ApiApiKey,
  type Organization,
} from "./api.ts";

export interface ApiKeyProps {
  keyId?: string | Secret<string>;
  secret?: string | Secret<string>;
  organization: string | Organization;
  name?: ApiApiKey["name"];
  expireAt?: ApiApiKey["expireAt"];
  roles?: ApiApiKey["roles"];
  ipAccessList?: ApiApiKey["ipAccessList"];
  state?: ApiApiKey["state"];
}

export interface ApiKey {
  organizationId: string;
  name: string;
  clickhouseId: ApiApiKey["id"];
  keyId: string;
  secret: Secret<string>;
  state: ApiApiKey["state"];
  roles: ApiApiKey["roles"];
  keySuffix: ApiApiKey["keySuffix"];
  createdAt: ApiApiKey["createdAt"];
  expireAt?: ApiApiKey["expireAt"];
  usedAt?: ApiApiKey["usedAt"];
  ipAccessList: ApiApiKey["ipAccessList"];
}

export const ApiKey = Resource(
  "clickhouse::ApiKey",
  async function (
    this: Context<ApiKey>,
    id: string,
    props: ApiKeyProps,
  ): Promise<ApiKey> {
    const api = createClickhouseApi({
      keyId: props.keyId,
      secret: props.secret,
    });

    const name =
      props.name ?? this.output?.name ?? this.scope.createPhysicalName(id);
    const state = props.state ?? this.output?.state ?? "enabled";

    const organizationId =
      typeof props.organization === "string"
        ? props.organization
        : props.organization.id;

    if (this.phase === "delete") {
      await api.v1
        .organizations(organizationId)
        .keys(this.output.clickhouseId)
        .delete();
      return this.destroy();
    }
    if (this.phase === "update") {
      if (
        diff(
          { ...props, name },
          { ...this.output, organization: props.organization },
        ).some(
          (prop) =>
            prop !== "name" &&
            prop !== "roles" &&
            prop !== "ipAccessList" &&
            prop !== "expireAt" &&
            prop !== "state",
        )
      ) {
        return this.replace();
      }
      const updatedKey = await api.v1
        .organizations(organizationId)
        .keys(this.output.clickhouseId)
        .patch({
          name,
          roles: props.roles,
          ipAccessList: props.ipAccessList,
          expireAt: props.expireAt,
          state,
        });

      return {
        ...this.output,
        ...updatedKey,
        name,
      };
    }

    const key = await api.v1.organizations(organizationId).keys.post({
      name,
      expireAt: props.expireAt ?? "2999-12-31T00:00:00.000Z",
      ipAccessList: props.ipAccessList ?? [
        {
          description: "Anywhere",
          source: "0.0.0.0/0",
        },
      ],
      roles: props.roles ?? ["admin"],
      state,
    });

    return {
      organizationId: organizationId,
      name: key.key.name,
      clickhouseId: key.key.id,
      state: key.key.state,
      roles: key.key.roles,
      keySuffix: key.key.keySuffix,
      createdAt: key.key.createdAt,
      expireAt: key.key.expireAt,
      usedAt: key.key.usedAt,
      ipAccessList: key.key.ipAccessList,
      keyId: key.keyId,
      secret: secret(key.keySecret),
    };
  },
);
