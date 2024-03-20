const proxyPops = {
  changeOrigin: true,
  secure: false,
  ws: false,
  target: `https://illin9551:8000/`
};

module.exports = {
  proxy: {
    [`/amaik/ask`]: { ...proxyPops },
    [`/amaik/best_knowledge`]: { ...proxyPops },
    [`/amaik/add`]: { ...proxyPops },
    [`/amaik/logs`]: { ...proxyPops },
    [`/amaik/all_docs`]: { ...proxyPops },
    [`/amaik/get_doc_by_id`]: { ...proxyPops },
    [`/amaik/best_people`]: { ...proxyPops },
    [`/amaik/documents_of_user`]: { ...proxyPops },
    [`/amaik/prompts_with_sources`]: { ...proxyPops }
  }
};