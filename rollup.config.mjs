import typescript from "rollup-plugin-typescript2";
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/bundle.js',
    format: 'cjs'
  },
  plugins: [
    typescript({
      include: [ "*.ts+(|x)", "**/*.ts+(|x)" ]
    }),
    terser()
  ]
}