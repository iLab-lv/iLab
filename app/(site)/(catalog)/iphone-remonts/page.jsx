// app/(site)/(catalog)/iphone-remonts/page.jsx
import IphoneRepairPage from './IphoneRepairPage';


const CANONICAL_PATH = '/iphone-remonts';

export const metadata = {
  title: 'iPhone remonts Rīgā | iLab',
  description:
    'iPhone remonts Rīgā - displeja, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana. Ātra diagnostika, skaidras cenas un 90 dienu garantija iLab servisā Rīgā.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return (
  <>
  <IphoneRepairPage locale="lv" />
  </>

  );
}