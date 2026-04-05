import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
    const siteTitle = "LaptopZone Infotech";
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Premium Computing Solutions`;
    const defaultDescription = "Discover top-tier business, gaming, and student laptops at LaptopZone Infotech. Your ultimate destination for high-performance computing and expert IT solutions.";
    const siteUrl = "https://laptopzone.info"; // Update with actual production domain

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description || defaultDescription} />
            {keywords && <meta name='keywords' content={keywords} />}
            <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || '/og-image.png'} />
            <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || '/og-image.png'} />
        </Helmet>
    );
};

export default SEO;
