#!/usr/bin/python

import sys, os;
import subprocess;
import tempfile;

def testcase():
    case = [];
    files = os.listdir("./test/")
    for path in files:
        root, ext = os.path.splitext(path)
        if(ext == ".green"):
            case.append(os.path.realpath("test/" + path))
    return case

target = [];

def get_result(case, target):
    ret = subprocess.check_output(
            ["java", "-jar", "./GreenTea.jar", "--" + target, case],
            universal_newlines=True
           )
    return ret;

def load_file(case, target):
    return open(case + "." + target).read();

def generate():
    print("generate test result")
    for t in target:
        for case in testcase():
            actual = get_result(case, t);
            f = open(case + "." + t, 'w')
            f.write(actual)
            f.close();

def load_template(filename):
    return open(filename).read()

def test(out):
    print("generate unittese");
    template = load_template("test/GreenTeaScriptTest." + out + ".template");
    for t in target:
        for case in testcase():
            actual = get_result(case, t);
            expected = load_file(case, t);
            if(actual != "" and expected != ""):
                s = template;
                fname = "Test" + case.split("/")[-1].split(".")[0].replace("/", "_").replace("-", "_");
                print(fname)
                f = open("build/" + fname + "." + out, 'w')
                s = s.replace("${TEST_NAME}", fname);
                s = s.replace("${SCRIPT_PATH}", case);
                s = s.replace("${RESULT_FILE}", case + "." + t);
                s = s.replace("${TARGET}", '"' + t + '"');
                f.write(s);
            #
        #
    #
    return

def usage():
    print("Usage:")
    print("Reset Test Answer   : " + sys.argv[0] + " --target=js,c --reset");
    print("Generate TestRunner : " + sys.argv[0] + " --target=js,c --out=java");
    exit(1);

if __name__ == '__main__':
    argc = len(sys.argv)
    if(argc < 3):
        usage()

    target = sys.argv[1][len("--tareget=")-1:].split(",");
    if(len(target) == 0):
        usage()

    if(argc > 2 and sys.argv[2] == "--reset"):
        generate();
    else:
        out = sys.argv[2][len("--out="):];
        test(out);
