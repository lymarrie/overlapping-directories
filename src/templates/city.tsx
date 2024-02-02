import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import DirectoryCityGrid from "../components/DirectoryCityGrid";
import PageLayout from "../components/PageLayout";
import Breadcrumbs from "../components/Breadcrumbs";


export const config: TemplateConfig = {
  stream: {
    $id: "city-stream",
    filter: {
      savedFilterIds: [YEXT_PUBLIC_CITY_SFID],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "c_addressRegionDisplayName",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
    ],
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
  __meta,
}) => {
  const { name, description, dm_directoryParents, dm_directoryChildren } =
    document;

  return (
    <>
      <PageLayout templateData={{__meta, document}}>
        <Banner name={name} />
        <div className="centered-container">
          <Breadcrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryCityGrid
            name={name}
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default City;
