import { Helmet } from "react-helmet-async";

function PageTitle({ title }: { title: string }) {
  return (
    <Helmet>
      <title>{title} &middot; InstaClone</title>
    </Helmet>
  );
}

export default PageTitle;
