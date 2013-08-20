import("JavaScript.Regexp");
import("JavaScript.Array");
import("JavaScript.String");
import("Type.File");
import("Type.Bytes");
import("Syntax.CStyleWhile");
import("Syntax.CStyleFor");
import("Konoha.NameSpace");

String readFile(String path) {
    FILE file = new FILE(path, "rb");
    int len = 0;
    String tmp = "";
    while (true) {
        int ch = file.getc();
        if (ch == -1) {
            break;
        }
        len = len + 1;
    }
    file.close();

    if (len == 0) {
        return "";
    }

    Bytes buf = new Bytes(len);
    file = new FILE(path, "r");
    file.read(buf, 0, len);
    file.close();
    return new String(buf);
}

String replace(String path, String data, String pattern, String before, String after) {
    String tmp = data;
    RegExp r1 = new RegExp(pattern);
    while (true) {
        String[] res = tmp.match(r1);
        if (res.getSize() == 0) {
            break;
        }
        tmp = tmp.replace(res.get(0), res.get(0).replace(before, after));
    }
    return tmp;
}

void emit(String path, String data) {
    FILE file = new FILE(path, "w");
    file.print(data);
}

String fixindent(String path, String data, String pattern) {
    String[] line = data.replace("\n\n", "\n@@@@@@@@@@@@@\n").split("\n");
    String data = "";
    RegExp r1 = new RegExp(pattern);
    for (int i=0; i < line.getsize(); i = i + 1) {
        String l = line.get(i);
        if(r1.test(l)) {
            String prev = line.get(i-1);
            int j = 0;
            String indent = "";
            while (j < prev.length) {
                if(prev.get(j) == "\t") {
                    indent = indent + "\t";
                    j = j + 1;
                    continue;
                }
                break;
            }
            data = data.trim() + indent;
        }
        data = data + l + "\n";
    }
    data = data.replace("\n@@@@@@@@@@@@@\n", "\n\n");
    return data;
}


void main() {
    String[] args = SCRIPT_ARGV;
    int i = 1;
    while (true) {
        if (i == args.getSize()) {
            break;
        }
        String data = readFile(args[i]);
        System.p("Fix " + args[i]);
        data = replace(args[i], data, "[a-zA-Z]+\\*\\)", "*)", " *)");
        data = replace(args[i], data, "@Override\n\t",  "@Override\n\t",  "@Override ");
        data = replace(args[i], data, "if \\(",  "if (",  "if(");
        data = replace(args[i], data, "} else",  "} else",  "}\nelse");
        data = replace(args[i], data, "\\){",  "){",  ") {");
        data = replace(args[i], data, "for \\(", "for (", "for(");
        data = replace(args[i], data, "while \\(", "while (", "while(");
        data = replace(args[i], data, "\\/\\* field \\*\\/",  "/* field */",  "/*field*/");
        data = replace(args[i], data, "\\/\\* local \\*\\/",  "/* local */",  "/*local*/");
        data = replace(args[i], data, "\n\t\n", "\n\t\n", "\n\n");
        data = replace(args[i], data, ";\t\n", ";\t\n", ";\n");
        data = replace(args[i], data, "; \n", "; \n", ";\n");

        data = fixindent(args[i], data, "^else").trim();

        emit(args[i], data);
        i = i + 1;
    }
}

main();
