/** @type {Function} */
import dvaModelExtend from 'dva-model-extend';

import { commonModel } from '@/models/common.model';

import {
  activitiesLogs, allDocs,
  askAi,
  bestKnowledge,
  bestPeople,
  documentsOfUser,
  promptsWithSources
} from '@/services/ai.service';

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
    knowledge: [],
    userDocs: [],
    logs: [],
    shared: [],
    costs: [
      {
        unit: 'ACEU',
        month: '1,023.34',
        year: '12,345.35',
        ask: '5,030',
        add: '1,304'
      },
      {
        unit: 'amAIz',
        month: '10,298.55',
        year: '150,360.38',
        ask: '60,034',
        add: '6,303'
      },
      {
        unit: 'DCDC',
        month: '200.44',
        year: '1,060.58',
        ask: '1,002',
        add: '1,994'
      },
      {
        unit: 'PEBU',
        month: '400.35',
        year: '3,305.12',
        ask: '3,004',
        add: '5,959'
      }
    ],
    particles: true
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
          question,
          sensitivity: 'personal'
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
          knowledge: [...data]
        }
      });
    },

    * logs({ payload = {} }, { put, call, select }) {
      const { data } = yield call(activitiesLogs);

      yield put({
        type: 'updateState',
        payload: {
          logs: [...data]
        }
      });
    },

    * best_people({ payload = {} }, { put, call, select }) {
      const { data } = yield call(bestPeople);

      yield put({
        type: 'updateState',
        payload: {
          people: [...data]
        }
      });
    },

    * prompts_with_sources({ payload = {} }, { put, call, select }) {
      const { data } = yield call(promptsWithSources);

      yield put({
        type: 'updateState',
        payload: {
          sources: [...data]
        }
      });
    },

    * documents_of_user({ payload = {} }, { put, call }) {
      const { data } = yield call(documentsOfUser, {username: payload.username});

      yield put({
        type: 'updateState',
        payload: {
          userDocs: [...data]
        }
      });
    },

    * all_docs({ payload = {} }, { put, call }) {
      const { data } = yield call(allDocs);

      yield put({
        type: 'updateState',
        payload: {
          shared: [...data]
        }
      });
    }
  },

  reducers: {}
});
