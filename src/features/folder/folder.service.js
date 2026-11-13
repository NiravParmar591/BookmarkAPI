const Folder = require("./folder.model");
const Bookmark = require("../bookmark/bookmark.model");
const { genError } = require("../shared/shared");

exports.createFolderService = async ({ user, input }) => {
    const existFolder = await Folder.findOne({ name: input.name });
    if (existFolder) throw genError("Choose diffrent folder name.", 400);

    const newFolder = new Folder({ name: input.name, owner: user._id });
    await newFolder.save();
    await newFolder.populate("owner", "username -_id");

    const newFolderObj = newFolder.toObject();
    newFolderObj.owner = newFolderObj.owner.username;
    delete newFolderObj.__v;

    return {
        success: true,
        message: "folder created successfully",
        newFolder: newFolderObj
    }
};

exports.userFolderListService = async ({ user }) => {
    let userFolders = await Folder.find({ owner: user._id }).select("-__v").populate("owner", "username -_id").lean();
    userFolders = userFolders.map(folder => ({ ...folder, owner: folder.owner.username }));

    return {
        success: true,
        message: "User's folders",
        userFolders: userFolders || []
    }
};

exports.updateFolderService = async ({ input }) => {
    let folder = await Folder.findById(input.id);
    if (!folder) throw genError("Folder not found", 400);
    if (folder.name === input.name) throw genError("Choose diffrent folder name.", 400);

    folder.name = input.name;
    await folder.save();
    await folder.populate("owner", "username  -_id");

    const folderObj = folder.toObject();
    folderObj.owner = folderObj.owner.username;
    delete folderObj.__v;

    return {
        success: true,
        message: "Folder updated successfully",
        updatedFolder: folderObj
    }
};

exports.deleteFolderService = async ({ input }) => {
    const folder = await Folder.findById(input.id);
    if (!folder) throw genError("Folder not found", 400);
    
    await Bookmark.deleteMany({ folder: folder._id });
    await folder.deleteOne();
    return {
        success: true,
        message: "Folder deleted successfully"
    }
};