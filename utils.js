// ---- Pure Functions ----
// ------------------------

// 1. Create new file/folder  --- in use????????????
function newElement() {
    var newName = prompt("Enter the name of the new file:");
    if (!validateName(newName)) {
        alert("Invalid folder/file name. Please enter a valid name with maximum 10 alphanumeric characters.");
        return;
    }
    var verifiedName = newName;
    console.log(verifiedName)
    return verifiedName;
}

// 2. Name Validation Check  --- in use????????????
function validateName(name) {
    var pattern = /^[a-zA-Z0-9]{1,10}$/;
    return pattern.test(name);
}

// 3. generateUniqueId   --- in use????????????
const idNameArr = [{ name: 'Root', id: 1 }]
let initId = 1;

function generateUniqueId(name) {
    var currentId = ++initId;
    idNameArr.push({ name, id: currentId });
    console.log('Id: ', currentId);
    return currentId;
}

// 4. Validation Chk
function validatePair(name, id) {
    const existingPair = idNameArr.find(pair => pair.name === name && pair.id === id);
    if (existingPair) {
        console.log("Similar Pair fount!")
        return 1;
    } else {
        console.log("Name and Id generated Successfully!")
        return 0;
    }
}

// 5. Define Level
function getLevel(parentLevel) {
    let childLevel = parentLevel + 1;
    console.log('Level: ', childLevel)
    return childLevel;
}

// 5. Fetch all others details such as level, type, children value
function createNode(id, name, type, level) {
    if (type == 'file') {
        setChildren = null;
    } else {
        setChildren = [];
    }
    var childObj = {
        id: id,
        name: name,
        type: type,
        level: level,
        children: setChildren
    };

    return childObj;
}

// 6. ValidateNode
function validateNode(obj) {
    if (obj.type == 'file' && obj.children == null) {
        console.log("Node Validation Done!");
        return 1;
    } else if (obj.type == 'folder' && obj.children.length === 0) {
        console.log("Node Validation Done!");
        return 1;
    } else {
        console.log("Node Validation Failed!");
        return 0;
    }
}

// 5. createHTMLNode
function createHtmlNode(node) {
    const element = document.createElement("div");
    element.setAttribute("id", node.id);

    if (node.type === "file") {
        element.classList.add("file");

        const icon = document.createElement("i");
        icon.classList.add("icon__file", "fas", "fa-file");

        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = node.name;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function () {
            const newName = prompt("Enter the new name:");
            if (newName) {
                editNodeName(node, newName);
            }
        });

        const dltBtn = document.createElement("button");
        dltBtn.textContent = "Delete";
        dltBtn.addEventListener("click", function () {
            const confirmDelete = confirm("Are you sure you want to delete this node?");
            if (confirmDelete) {
                deleteNode(node.id);
            }
        });

        element.appendChild(icon);
        element.appendChild(nameParagraph);
        element.appendChild(editBtn);
        element.appendChild(dltBtn);

    } else if (node.type === "folder") {
        element.classList.add("folder");

        const icon = document.createElement("i");
        icon.classList.add("icon__folder", "fas", "fa-folder-open");

        const toggleIcon = document.createElement("i");
        toggleIcon.classList.add("fa", "fa-caret-down", "toggle-icon");

        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = node.name;

        const childrenContainer = document.createElement("div");
        childrenContainer.classList.add("folder__children");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function () {
            const newName = prompt("Enter the new name:");
            if (newName) {
                editNodeName(node, newName);
            }
        });

        const dltBtn = document.createElement("button");
        dltBtn.textContent = "Delete";
        dltBtn.addEventListener("click", function () {
            const confirmDelete = confirm("Are you sure you want to delete this node?");
            if (confirmDelete) {
                deleteNode(node.id);
            }
        });

        const newFileBtn = document.createElement("button");
        newFileBtn.textContent = "New File";
        newFileBtn.addEventListener("click", function () {
            const newName = newElement();
            if (newName) {
                var newNodeId = generateUniqueId(newName);
                var parentFolderElement = this.closest(".folder");
                console.log("parentFolderElement: ", parentFolderElement);
                if (parentFolderElement) {
                    console.log("Inside if of parentFolderElement")
                    var parentFolderId = parentFolderElement.id;
                    console.log("parentFolderId: ", parentFolderId);
                    var newNodeLevel = getLevel(parseInt(parentFolderId));
                    var newNode = createNode(newNodeId, newName, "file", newNodeLevel);
                    addNodeToStructureAndHtml(newNode, parentFolderId);
                }
            }
        });

        const newFolderBtn = document.createElement("button");
        newFolderBtn.textContent = "New Folder";
        newFolderBtn.addEventListener("click", function () {
            const newName = newElement();
            if (newName) {
                var newNodeId = generateUniqueId(newName);
                var parentFolderElement = this.closest(".folder");
                // var parentFolderElement1 = event.target.parentNode;
                // console.log("parentFolderElement1:", parentFolderElement1);
                console.log("parentFolderElement: ", parentFolderElement);
                if (parentFolderElement) {
                    console.log("Inside if of parentFolderElement")
                    const parentFolderId = parentFolderElement.id;
                    // var parentFolderId1 = parentFolderElement1.id;
                    console.log("parentFolderId: ", parentFolderId);
                    // console.log("parentFolderId1: ", parentFolderId1);
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

        childrenContainer.style.display = "none";

        toggleIcon.addEventListener("click", function () {
            childrenContainer.style.display = childrenContainer.style.display === "none" ? "block" : "none";
            toggleIcon.classList.toggle("fa-caret-down");
            toggleIcon.classList.toggle("fa-caret-right");
        });

        if (node.children) {
            node.children.forEach(child => {
                const childNode = createHtmlNode(child);
                childrenContainer.appendChild(childNode);
            });
        }

        element.appendChild(icon);
        element.appendChild(toggleIcon);
        element.appendChild(nameParagraph);
        element.appendChild(childrenContainer);
        element.appendChild(editBtn);
        element.appendChild(dltBtn);
        element.appendChild(newFileBtn);
        element.appendChild(newFolderBtn);
    }

    if (node.children) {
        node.children.forEach(child => {
            const childNode = createHtmlNode(child);
            element.querySelector(".folder-children").appendChild(childNode);
        });
    }

    return element;
}

function addNodeToStructureAndHtml(newNode, parentFolderId) {
    // console.log("parentFolderId: ", parentFolderId);
    // console.log("folderStructure: ", folderStructure);
    const parentFolder = findNodeById(folderStructure, parentFolderId);
    // console.log(parentFolder);
    if (!parentFolder) {
        // console.log("Parent folder not found.");
        return;
    }

    const validationStatus = validateNode(newNode);
    if (validationStatus) {
        parentFolder.children.push(newNode);
        const parentNode = document.getElementById(parentFolderId);
        const newNodeElement = createHtmlNode(newNode);
        parentNode.appendChild(newNodeElement);
        // console.log(folderStructure);
    } else {
        console.log("Some issue with addNodeToStructureAndHtml function ka validateNode function.");
    }
}

function findNodeById(structure, id) {
    for (const node of structure) {
        const foundNode = searchNode(node, id);
        if (foundNode) {
            return foundNode;
        }
    }
    return null;
}

function searchNode(node, id) {
    if (node.id == id) {
        return node;
    }

    if (node.children) {
        for (const child of node.children) {
            const foundNode = searchNode(child, id);
            if (foundNode) {
                return foundNode;
            }
        }
    }

    return null;
}

function editNodeName(node, newNodeName) {
    if (!validateName(newNodeName)) {
        alert("Invalid folder/file name. Please enter a valid name with maximum 10 alphanumeric characters.");
        return;
    }

    node.name = newNodeName;
    updateNodeNameInHtml(node.id, newNodeName);

    const nodeToUpdate = findNodeById(folderStructure, node.id);
    if (nodeToUpdate) {
        nodeToUpdate.name = newNodeName;
    }
}


function updateNodeNameInHtml(nodeId, newName) {
    const nodeElement = document.getElementById(nodeId);
    if (nodeElement) {
        const nameParagraph = nodeElement.querySelector("p");
        if (nameParagraph) {
            nameParagraph.textContent = newName;
        }
    }
}

function deleteNode(nodeId) {
    const nodeElement = document.getElementById(nodeId);
    if (nodeElement) {
        nodeElement.remove();

        const parentNode = findNodeById(folderStructure, nodeId);
        if (parentNode) {
            const indexToRemove = parentNode.children.findIndex(child => child.id === nodeId);
            if (indexToRemove !== -1) {
                parentNode.children.splice(indexToRemove, 1);
            }
        }
    }
}