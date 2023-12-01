import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: import.meta.env.VITE_GRAPHQL_SCHEMA,

  generates: {
    "src/__generated__/": {
      documents: "./src/**/*.{ts,tsx}",
      preset: "client",
      plugins: [
        // "typescript",
        // "typescript-operations",
        // "typescript-react-apollo",
      ],
    },
  },
};

export default config;
