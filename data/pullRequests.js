// data/pullRequests.ts
export const dummyPRFiles = [
    {
      filename: "src/components/Button.tsx",
      additions: 10,
      deletions: 2,
      changes: 12,
      patch: `+ export function Button() {\n+   return <button>Click me</button>;\n+ }`
    },
    {
      filename: "src/utils/helpers.ts",
      additions: 5,
      deletions: 1,
      changes: 6,
      patch: `+ export function greet(name: string) {\n+   return \`Hello, \${name}\`;\n+ }`
    }
];