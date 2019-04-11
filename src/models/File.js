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
  // usamos variaveis ambiente para configurar a url para heroku
  const url = process.env.URL || "http://localhost:3333";
  return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongose.model("File", File);
