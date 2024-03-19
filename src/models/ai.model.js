/** @type {Function} */
import dvaModelExtend from 'dva-model-extend';

import { commonModel } from '@/models/common.model';

import { askAi, bestKnowledge, bestPeople, promptsWithSources } from '@/services/ai.service';

const MODEL_NAME = 'aiModel';

/**
 * @export
 */
export default dvaModelExtend(commonModel, {
  namespace: MODEL_NAME,

  state: {
    answers: [],
    people: [],
    sources: [],
    knowledge: []
  },

  subscriptions: {
    setup({ dispatch }) {
      // TODO: Do something.
    }
  },

  effects: {

    * ask({ payload = {} }, { put, call, select }) {
      const { answers } = yield select(state => state[MODEL_NAME]);
      const { question } = payload;

      const { data } = yield call(askAi, {
        data: {
          username: 'pavel',
          context: '',
          question
        }
      });

      yield put({
        type: 'updateState',
        payload: {
          answers: [
            ...answers,
            {
              q: question,
              a: data.response,
              s: data.sources
            }
          ]
        }
      });
    },

    * best_knowledge({ payload = {} }, { put, call, select }) {
      const { data } = yield call(bestKnowledge);

      yield put({
        type: 'updateState',
        payload: {
          knowledge: [...data],
          sources: [],
          people: []
        }
      });
    },

    * best_people({ payload = {} }, { put, call, select }) {
      const { data } = yield call(bestPeople);

      yield put({
        type: 'updateState',
        payload: {
          people: [...data],
          sources: [],
          knowledge: []
        }
      });
    },

    * prompts_with_sources({ payload = {} }, { put, call, select }) {
      const { data } = yield call(promptsWithSources);

      yield put({
        type: 'updateState',
        payload: {
          sources: [...data],
          people: [],
          knowledge: []
        }
      });
    }
  },

  reducers: {}
});
