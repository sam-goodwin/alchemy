import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

import {
  fromContainerMetadata as _fromContainerMetadata,
  fromEnv as _fromEnv,
  fromHttp as _fromHttp,
  fromIni as _fromIni,
  fromInstanceMetadata as _fromInstanceMetadata,
  fromNodeProviderChain as _fromNodeProviderChain,
  fromProcess as _fromProcess,
  fromSSO as _fromSSO,
  fromTokenFile as _fromTokenFile,
  fromWebToken as _fromWebToken,
} from "@aws-sdk/credential-providers";

import type {
  AwsCredentialIdentity,
  AwsCredentialIdentityProvider,
} from "@smithy/types";

export class Credentials extends Context.Tag("AWS::Credentials")<
  Credentials,
  {
    accessKeyId: Redacted.Redacted<string>;
    secretAccessKey: Redacted.Redacted<string>;
    sessionToken: Redacted.Redacted<string | undefined>;
  }
>() {}

const fromAwsCredentialIdentity = (identity: AwsCredentialIdentity) =>
  Credentials.of({
    accessKeyId: Redacted.make(identity.accessKeyId),
    secretAccessKey: Redacted.make(identity.secretAccessKey),
    sessionToken: Redacted.make(identity.sessionToken),
  });

const createLayer = (provider: (config: {}) => AwsCredentialIdentityProvider) =>
  Layer.effect(
    Credentials,
    Effect.gen(function* () {
      return fromAwsCredentialIdentity(
        yield* Effect.promise(() => provider({})()),
      );
    }),
  );

export const fromEnv = createLayer(_fromEnv);

export const fromChain = createLayer(_fromNodeProviderChain);

export const fromSSO = createLayer(_fromSSO);

export const fromIni = createLayer(_fromIni);

export const fromContainerMetadata = createLayer(_fromContainerMetadata);

export const fromHttp = createLayer(_fromHttp);

export const fromInstanceMetadata = (
  ...parameters: Parameters<typeof _fromInstanceMetadata>
) => createLayer(() => _fromInstanceMetadata(...parameters));

export const fromProcess = createLayer(_fromProcess);

export const fromTokenFile = createLayer(_fromTokenFile);

export const fromWebToken = (...parameters: Parameters<typeof _fromWebToken>) =>
  createLayer(() => _fromWebToken(...parameters));
