import { Client } from "@notionhq/client";
import React from "react";
import "server-only";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = React.cache(() => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Status",
      status: {
        equals: "Live",
      },
    }
  });
});

export const fetchBySlug = React.cache((slug) => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug
      }
    }
  })
  .then((res) => res.results[0])
}) 

export const fetchByTag = React.cache((tag, offset = undefined) => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Tags",
      multi_select: {
        contains: tag
      }
    },
    start_cursor: offset,
    page_size: 100,
    
  })
  .then((res) => res.results)
})

export const fetchPageBlocks = React.cache((pageId) => {
  return notion.blocks.children.list({
    block_id: pageId
  })
  .then((res) => res.results)
})



const databaseId = process.env.NOTION_DATABASE_ID;

export const incrementVisit = async (slug) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug
      }
    }
  });

  let pageId;
  // if (response.results.length === 0) {
  //   const newPage = await notion.pages.create({
  //     parent: { database_id: databaseId },
  //     properties: {
  //       'URL': { title: [{ text: { content: url } }] },
  //       'Visits': { number: 1 },
  //       'Timestamps': { multi_select: [{ name: new Date().toISOString() }] }
  //     }
  //   });
  //   pageId = newPage.id;
  // } else {
    pageId = response.results[0].id;
    const visits = typeof response.results[0].properties.Visits.number === 'number' ? response.results[0].properties.Visits.number +1 : 1;
    const timestamps = response.results[0].properties.Timestamps.multi_select.map(ts => ts.name);
    timestamps.push(new Date().getTime().toString());

    await notion.pages.update({
      page_id: pageId,
      properties: {
        'Visits': { number: visits },
        'Timestamps': { multi_select: timestamps.map(ts => ({ name: ts })) }
      }
    });
  // }

  return pageId;
};

export const getTopPages = async () => {
  const oneWeekAgo = (new Date().getTime()) - (1000 * 60 * 60 * 24 * 7);
  console.log("oneWeekAgo", oneWeekAgo);

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Timestamps',
      multi_select: {
        contains: { }
      }
    },
    sorts: [
      {
        property: 'Visits',
        direction: 'descending'
      }
    ],
    page_size: 5
  });
  console.log(response.results);
  return response.results
};
