import React from 'react';
import { Helmet } from 'react-helmet';

const Metatags = ({ description, title, siteTitle ,url,image}) => {
    return (
        <Helmet
            title={title}
            titleTemplate={siteTitle ? `%s | ${siteTitle}` : null}
            meta={[
                {
                    name: `description`,
                    content: description,
                },
                {
                    property: `fb:app_id`,
                    content: '137904151817325',
                },
                {
                    property: `fb:admins`,
                    content: '100068906506227',
                },
                {
                    property: `og:url`,
                    content: url,
                },
                {
                    property: `og:site_name`,
                    content: "Coaventurate.com",
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: description,
                },
                {
                    property: `og:image`,
                    content: image,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: description,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: description,
                },
            ]}
        />
    )
}

export default Metatags;