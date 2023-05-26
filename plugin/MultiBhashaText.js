module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const currentFilePath = state.file.opts.filename;
        if (currentFilePath.includes("/node_modules/")) {
          return; // Skip traversal for files outside the allowed folder
        }

        // Check if the import statement is from "react-native"
        if (path.node.source.value === "react-native") {
          if (
            path.node.trailingComments &&
            path.node.trailingComments[0].type === "CommentLine" &&
            path.node.trailingComments[0].value ===
              "@ignore-multi-bhasha-transformation"
          ) {
            return; // Skip traversal for "react-native" with //@ignore-multi-bhasha-transformation expression
          }

          // Update the import source to "react-native" => "@swiggy-private/multi-bhasha"
          path.node.source.value = "@swiggy-private/multi-bhasha";
        }
      },
    },
  };
};
