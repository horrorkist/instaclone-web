// import type { CodegenConfig } from "@graphql-codegen/cli";
// import "dotenv/config";

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "https://api.horrorkist.com/graphql",
//   generates: {
//     "src/__generated__/": {
//       documents: "./src/**/*.{ts,tsx}",
//       preset: "client",
//       plugins: [
//         // "typescript",
//         // "typescript-operations",
//         // "typescript-react-apollo",
//       ],
//     },
//   },
// };

// export default config;

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://api.horrorkist.com/graphql": {
        method: "POST",
        headers: { "content-type": "application/json" },
      },
    },
  ],
  generates: {
    "src/__generated__/": {
      documents: "./src/**/*.{ts,tsx}",
      preset: "client",
    },
  },
};

export default config;
