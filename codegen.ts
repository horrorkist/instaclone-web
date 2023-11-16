import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/",

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
