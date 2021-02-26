const camelToTextCase = (camel: string): string => {
  const result = camel.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default camelToTextCase;
