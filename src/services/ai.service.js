import request from '@/utils/request';

export const askAi = async ({ data }) => {
  return request.xhr({
    url: '/amaik/ask',
    method: request.METHOD.post,
    data
  });
};

export const bestKnowledge = async () => {
  return request.xhr({
    url: '/amaik/best_knowledge',
    method: request.METHOD.get
  });
};

export const bestPeople = async () => {
  return request.xhr({
    url: '/amaik/best_people',
    method: request.METHOD.get
  });
};

export const allDocs = async () => {
  return request.xhr({
    url: '/amaik/all_docs',
    method: request.METHOD.get
  });
};

export const promptsWithSources = async () => {
  return request.xhr({
    url: '/amaik/prompts_with_sources',
    method: request.METHOD.get
  });
};

export const activitiesLogs = async () => {
  return request.xhr({
    url: '/amaik/logs',
    method: request.METHOD.get
  });
};

export const documentsOfUser = async ({ username }) => {
  return request.xhr({
    url: `/amaik/documents_of_user/${username}`,
    method: request.METHOD.get
  });
};