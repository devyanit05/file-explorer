document.addEventListener("DOMContentLoaded", function () {
    const newFileBtn = document.getElementById("newFileBtn");
    const newFolderBtn = document.getElementById("newFolderBtn");

    newFileBtn.addEventListener("click", function (event) {
        const newName = newElement();
        if (newName) {
            var newNodeId = generateUniqueId(newName);
            var parentFolderElement = event.target.closest(".folder");
            var parentFolderElement2 = this.closest(".folder");
            var parentFolderElement1 = event.target.parentNode;
            console.log("parentFolderElement1:", parentFolderElement1);
            console.log("parentFolderElement: ", parentFolderElement);
            console.log("parentFolderElement2: ", parentFolderElement2);
            if (parentFolderElement) {
                console.log("Inside if of parentFolderElement")
                var parentFolderId = parentFolderElement.id;
                var parentFolderId1 = parentFolderElement1.id;
                console.log("parentFolderId: ", parentFolderId);
                console.log("parentFolderId1: ", parentFolderId1);
                var newNodeLevel = getLevel(parseInt(parentFolderId));
                var newNode = createNode(newNodeId, newName, "file", newNodeLevel);
                addNodeToStructureAndHtml(newNode, parentFolderId);
            }
        }
    });

    newFolderBtn.addEventListener("click", function (event) {
        const newName = newElement();
        if (newName) {
            var newNodeId = generateUniqueId(newName);
            var parentFolderElement = this.closest(".folder");
            var parentFolderElement1 = event.target.parentNode;
            console.log("parentFolderElement1:", parentFolderElement1);
            console.log("parentFolderElement: ", parentFolderElement);
            if (parentFolderElement) {
                console.log("Inside if of parentFolderElement")
                const parentFolderId = parentFolderElement.id;
                var parentFolderId1 = parentFolderElement1.id;
                console.log("parentFolderId: ", parentFolderId);
                console.log("parentFolderId1: ", parentFolderId1);
                var newNodeLevel = getLevel(parseInt(parentFolderId));
                var newNode = createNode(newNodeId, newName, "folder", newNodeLevel);
                addNodeToStructureAndHtml(newNode, parentFolderId);
            } else {
                console.log("Never found parentFolderElement")
            }
        } else {
            console.log("Never went in new name")
        }
    });
});
