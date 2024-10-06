import { transformSync } from '@babel/core';
import jsx from '@babel/plugin-syntax-jsx';

// Helper function to convert px to rem in string values
const pxToRem = (value, options) => {
  const pxRegex = /(\d*\.?\d+)px/g;
  return value.replace(pxRegex, (_, pxValue) => `${(pxValue / options.rootValue).toFixed(options.unitPrecision)}rem`);
};

// Babel plugin to transform inline style px to rem
function babelPluginPxToRem(options) {
  return {
    name: 'babel-plugin-px-to-rem',
    visitor: {
      JSXAttribute(path) {
        // Only target 'style' attributes
        if (path.node.name.name === 'style' && path.node.value.expression) {
          const properties = path.node.value.expression.properties;

          properties.forEach((property) => {
            const { value } = property;

            // For string literals with 'px' units (e.g., '16px')
            if (value && value.type === 'StringLiteral' && value.value.includes('px')) {
              property.value.value = pxToRem(value.value, options);
            }

            // For numeric literals (e.g., width: 100)
            if (value && value.type === 'NumericLiteral') {
              // Convert numeric value (assumed in px) to rem
              property.value = {
                ...property.value,
                type: 'StringLiteral', // Convert to string literal
                value: `${(value.value / options.rootValue).toFixed(options.unitPrecision)}rem`, // Convert px to rem
              };
            }
          });
        }
      },
    },
  };
}

// Vite plugin to transform px to rem in JSX inline styles
/**
 * 
 * @param {
 *  rootValue: number // Root font size in pixels
 *  unitPrecision: number // Number of decimal places to round the rem value
 * } options 
 * @returns 
 */
export default function vitePluginInlineStylePxToRem(options) {
  return {
    name: 'vite-plugin-inline-style-px-to-rem',
    enforce: 'pre', // Apply the plugin before others
    transform(code, id) {
      if (/\.jsx$|\.tsx$/.test(id)) {
        const result = transformSync(code, {
          plugins: [jsx, babelPluginPxToRem(options)],
          ast: false,
          sourceMaps: false,
          filename: id,
        });

        return {
          code: result.code,
          map: result.map,
        };
      }
      return null;
    },
  };
}