const mongose = require("mongoose");

const File = new mongose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

// Faz preparaçao dos caminhos como url para que as aplicaçoes
// possam acessa-las

File.virtual("url").get(function() {
  return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongose.model("File", File);
