import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./__DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

// export function saveQuestion(info) {
//   return _saveQuestion(info);
// }

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(authUser, qid, answer) {
  return _saveQuestionAnswer({ authUser, qid, answer });
}
