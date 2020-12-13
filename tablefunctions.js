function TableCreator(selector) {
    var table = this.table = $(selector);

    function rowCreator(student, allowDeleting) {
        var tr = $("<tr />");
        tr.append(cellCreator(student.name));
        tr.append(cellCreator(student.surname));
        tr.append(cellCreator(student.age));
        tr.append(cellCreator(student.average, "average"));
        if (allowDeleting) {
            tr.append(removeButtonCreator(tr, student.id));
        } else
            tr.append(cellCreator(""));
        return tr;
    }

    function cellCreator(data, className) {
        var td = $("<td />");
        td.text(data);
        if (className) {
            td.addClass(className);
        }
        return td;
    }

    function removeButtonCreator(tr, id) {
        var button = $("<button />");
        var td = cellCreator("");
        button.attr("type", "submit");
        button.addClass("deleteButton");
        button.html("DELETE");
        button.on("click", function() {
            tr.remove();
            students.splice(id, 1);
        });
        td.append(button);
        return td;
    }

    return {
        addRow: function(student, allowDeleting) {
            table.append(rowCreator(student, allowDeleting));
        },
        lastRowRemover: function() {
            table.empty();
        }
    }
}