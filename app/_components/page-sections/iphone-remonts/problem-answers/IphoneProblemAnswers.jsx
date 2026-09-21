import ProblemAnswers from '@/_components/sections/problem-answers/ProblemAnswers';
import { getIphoneProblemAnswersContent } from '../iphoneRemonts.i18n';

export default function IphoneProblemAnswers({ locale = 'lv' }) {
  const content = getIphoneProblemAnswersContent(locale);

  return <ProblemAnswers id="iphone-problems" content={content} variant="iphone" highlightFirstAnswer />;
}
