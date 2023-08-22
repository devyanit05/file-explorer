document.addEventListener("DOMContentLoaded", function () {
    const newFileBtn = document.getElementById("newFileBtn");
    const newFolderBtn = document.getElementById("newFolderBtn");

    newFileBtn.addEventListener("click", function (event) {
        const newName = newElement();
        if (newName) {
            const newNodeId = generateUniqueId(newName);
            const parentFolderElement = event.target.closest(".folder");
            console.log("parentFolderElement: ", parentFolderElement);
            if (parentFolderElement) {
                const parentFolderId = parentFolderElement.id;
                const newNodeLevel = getLevel(parseInt(parentFolderId));
                const newNode = createNode(newNodeId, newName, "file", newNodeLevel);
                addNodeToStructureAndHtml(newNode, parentFolderId);
            }
        }
    });

    newFolderBtn.addEventListener("click", function (event) {
        const newName = newElement();
        if (newName) {
            const newNodeId = generateUniqueId(newName);
            const parentFolderElement = event.target.closest(".folder");
            console.log("parentFolderElement: ", parentFolderElement);
            if (parentFolderElement) {
                console.log(parentFolderElement);
                const parentFolderId = parentFolderElement.id;
                const newNodeLevel = getLevel(parseInt(parentFolderId)); 
                const newNode = createNode(newNodeId, newName, "folder", newNodeLevel);
                addNodeToStructureAndHtml(newNode, parentFolderId);
            }
        }
    });
});
