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
      property: "slug",
      rich_text: {
        equals: slug
      }
    }
  })
  .then((res) => res.results[0])
}) 

export const fetchByTag = React.cache((tag) => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Tags",
      multi_select: {
        contains: tag
      }
    }
  })
  .then((res) => res.results)
})

export const fetchPageBlocks = React.cache((pageId) => {
  return notion.blocks.children.list({
    block_id: pageId
  })
  .then((res) => res.results)
})
