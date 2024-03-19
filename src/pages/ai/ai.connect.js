import { connect } from '@umijs/max';
import Ai from '@/pages/ai/ai';

const MODEL_NAME = 'aiModel';

/**
 * @constant
 * @param aiModel
 * @param loading
 * @return {{authModel, appModel, loading}}
 */
const mapStateToProps = ({ aiModel, loading }) => ({
  aiModel,
  loading
});

/**
 * @constant
 * @param dispatch
 * @return {{onUpdateDocumentMeta(*): void, dispatch, onDefineAbilities(): void, onNotification(): void}}
 */
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  onAskAi(question) {
    dispatch({ type: `${MODEL_NAME}/ask`, payload: { question } });
  },
  onBestKnowledge() {
    dispatch({ type: `${MODEL_NAME}/best_knowledge` });
  },
  onBestPeople() {
    dispatch({ type: `${MODEL_NAME}/best_people` });
  },
  onPromptsWithSources() {
    dispatch({ type: `${MODEL_NAME}/prompts_with_sources` });
  },
  onNotification() {
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ai);
