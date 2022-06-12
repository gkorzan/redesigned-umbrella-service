const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());
export { camelize };
