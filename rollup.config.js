import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import babelPlugin from '@rollup/plugin-babel'
// 打包外部模块
// import resolve from '@rollup/plugin-node-resolve'
// 用于UMD模式，引入全局变量
// import globals from 'rollup-plugin-node-globals'
// 用于UMD模式，为浏览器提供node模块的 pollyfill，通常来说我们不应该将node模块打包进浏览器，如果确定不需要，可以不用这个插件
// import builtins from 'rollup-plugin-node-builtins'
// import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
// 打包类型声明
import dts from 'rollup-plugin-dts'
import { importExportPlugin } from 'rollup-plugin-import-export'

const config = defineConfig([
  {
    input: ['src/index.ts'],
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        // 开启这个选项会将每个模块单独打包，有利于摇树优化
        preserveModules: true
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        preserveModules: true
      }
    ],
    // external: ['@vue/composition-api'],
    plugins: [
      importExportPlugin(),
      ts(),
      babelPlugin({
        exclude: '**/node_modules/**',
        babelHelpers: 'bundled',
        // babel默认不处理ts文件，加上这个配置就可以了 extensions: ['.ts']
        extensions: ['.ts'],
        presets: [['@babel/preset-env', { targets: { esmodules: true } }]]
      }),
      json(),
      commonjs()
    ]
  },
  // {
  //   input: 'src/index.ts',
  //   output: [
  //     {
  //       file: 'dist/umd/index.js',
  //       format: 'umd',
  //       name: 'utils'
  //     }
  //   ],
  //   external: ['@vue/composition-api'],
  //   plugins: [
  //     importExportPlugin(),
  //     ts(),
  //     babelPlugin({
  //       exclude: '**/node_modules/**',
  //       babelHelpers: 'bundled',
  //       // babel默认不处理ts文件，加上这个配置就可以了 extensions: ['.ts']
  //       extensions: ['.ts'],
  //       presets: [['@babel/preset-env', { targets: { ie: '11' } }]]
  //     }),
  //     json(),
  //     commonjs(),
  //     resolve({ preferBuiltins: true, mainFields: ['browser'] }),
  //     globals(),
  //     builtins(),
  //     terser()
  //   ]
  // },
  // 打包类型声明
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/types',
      format: 'esm',
      preserveModules: true
    },
    plugins: [importExportPlugin(), dts()]
  }
])

export default config
