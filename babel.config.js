module.exports = function (api) {
    api.cache(true);
  
    // const sourceType = "unambiguous";
    const presets = [["@babel/preset-typescript", {
        "allExtensions": true,
        "isTSX": true,
    // }], "@babel/preset-react" ];
    }], "@babel/preset-react", "@babel/preset-env"];
    const plugins = [ ];
  
    return {
      // sourceType,
      presets,
      plugins
    };
  }