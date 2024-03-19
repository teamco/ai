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

export const promptsWithSources = async () => {
  return request.xhr({
    url: '/amaik/prompts_with_sources',
    method: request.METHOD.get
  });
};