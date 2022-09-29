import { ContentState, convertToRaw, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

class DraftService {
  htmlToDraftBlocks = (html: string) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  draftBlocksToHtml = (blockDraft: any) => {
    return draftToHtml(convertToRaw(blockDraft?.getCurrentContent()));
  }

  checkDiff = (blockDraft1: any, blockDraft2: any) => {
    return this.draftBlocksToHtml(blockDraft1) !== this.draftBlocksToHtml(blockDraft2);
  }
}

export const draftService = new DraftService();

