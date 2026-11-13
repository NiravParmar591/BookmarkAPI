const { genError } = require("../shared/shared");
const Bookmark = require("./bookmark.model");
const Folder = require("../folder/folder.model");

exports.createBookmarkService = async ({ user, input }) => {
    const folder = await Folder.findById(input.folderId);
    if (!folder) throw genError("Folder not found.", 404);

    const bookmarkExist = await Bookmark.findOne({
        $or: [
            { title: input.title },
            { url: input.url },
        ],
        folder: folder._id
    });

    if (bookmarkExist) {
        const titleMatches = bookmarkExist.title.toLowerCase() === input.title.toLowerCase();
        const urlMatches = bookmarkExist.url.toLowerCase() === input.url.toLowerCase();

        if (titleMatches && urlMatches) throw genError('Bookmark already exists in this folder.', 409);
        if (titleMatches) throw genError('Title already exists in this folder.', 409);
        throw genError('URL already saved in this folder.', 409);
    }

    const newBookmark = new Bookmark({ title: input.title, url: input.url, folder: folder._id, owner: user._id });
    await newBookmark.save();

    await newBookmark.populate("owner", "username -_id");
    await newBookmark.populate("folder", "name -_id");

    const newBookmarkObj = newBookmark.toObject();
    delete newBookmarkObj.__v;
    newBookmarkObj.folder = newBookmarkObj.folder.name;
    newBookmarkObj.owner = newBookmarkObj.owner.username;

    return {
        success: true,
        message: "New Bookmark created successfully",
        bookmark: newBookmarkObj
    }
};

exports.getBookmarksServic = async ({ user, input }) => {
    const query = input.folderId ? { folder: input.folderId } : { owner: user._id };
    let bookmarks = await Bookmark.find(query).populate("owner", "username -_id").populate("folder", "name -_id").select("-__v").lean();

    if (input.folderId && bookmarks.length < 0) {
        throw genError("Invalid folder id.", 404);
    }

    bookmarks = bookmarks.map(bookmark => ({ ...bookmark, folder: bookmark.folder.name, owner: bookmark.owner.username }));
    return {
        success: true,
        message: "Available bookmarks",
        bookmarks
    }
};

exports.updateBookmarService = async ({ input }) => {
    const bookmark = await Bookmark.findById(input.id);
    if (!bookmark) throw genError("Invalid bookmark id.", 409);

    if (input.title) bookmark.title = input.title;
    if (input.url) bookmark.url = input.url;
    await bookmark.save();

    await bookmark.populate("owner", "username -_id");
    await bookmark.populate("folder", "name -_id");

    const bookmarkObj = bookmark.toObject();
    delete bookmarkObj.__v;
    bookmarkObj.folder = bookmarkObj.folder.name;
    bookmarkObj.owner = bookmarkObj.owner.username;

    return {
        success: true,
        message: "Bookmark updated successfully",
        bookmarkObj
    }
};

exports.deleteBookmarService = async ({ input }) => {
    const bookmark = await Bookmark.findById(input.id);
    if (!bookmark) throw genError("Invalid bookmark id.", 409);

    await bookmark.deleteOne();

    return {
        success: true,
        message: "Bookmark deleted successfully"
    }
};