#!/usr/bin/python

import sys, os;
import subprocess;
import tempfile;

test_result_dir = "test/codegen/";

def testcase():
    case = [];
    files = os.listdir(test_result_dir)
    for path in files:
        root, ext = os.path.splitext(path)
        if(ext == ".green"):
            case.append(os.path.realpath(test_result_dir + path))
    return case

target = [];

def ext(t):
    if(t == "python"):
        return "py"
    if(t == "javascript"):
        return "js"
    return t

def get_result(case, jar, target):
    ret = subprocess.check_output(
            ["java", "-jar", jar, "-l", target, case],
            universal_newlines=True
           )
    return ret;

def load_file(case, target):
    return open(case + "." + target).read();

def generate():
    print("generate test result")
    for t in target:
        for case in testcase():
            actual = get_result(case, "./GreenTeaScript.jar", t);
            f = open(case + "." + ext(t), 'w')
            f.write(actual)
            f.close();

def load_template(filename):
    return open(filename).read()

def test():
    print("------------------------------");
    print("Running unittese");
    print("------------------------------");
    tests = 0
    failures = 0
    result = "";
    failed_tests = []
    for t in target:
        for case in testcase():
            answer = case + "." + ext(t)
            print("testing taget=" + t + " case=" + case)
            ret = subprocess.call(
                    ["java", "-jar", "./GreenTeaScript-TestRunner.jar", t, case, answer],
                   )
            result = result + '<testcase classname="GeenTeaScriptTest.' + t + '" name="' + answer + '" time="0">\n'
            tests = tests + 1
            if(ret != 0):
                failed_tests.append((case, t))
                result = result + '<failure>AssertionFailed</failure>\n'
                failures = failures + 1;
            result = result + '<system-out></system-out>\n'
            result = result + '</testcase>\n'

            #if(t == "py"):
            #    print("syntax checking taget=" + t + " case=" + case)
            #    ret = subprocess.call(
            #            ["./tool/check-syntax-py", case],
            #           )
            #    result = result + '<testcase classname="SyntaxCheck.py" name="' + answer + '" time="0">\n'
            #    tests = tests + 1
            #    if(ret != 0):
            #        failed_tests.append((case, t))
            #        result = result + '<failure>SyntaxAssertion</failure>\n'
            #        failures = failures + 1;
            #    result = result + '<system-out></system-out>\n'
            #    result = result + '</testcase>\n'

        #
    #
    header = '<?xml version="1.0"?>\n'
    header = header + '<testsuites>\n'
    header = header + '<testsuite name="GreenTeaScriptTest" tests="' + str(tests) + '" ';
    header = header + 'time="0" failures="' + str(failures) + '" errors="0" skipped="0">\n'

    footer = ''
    footer = footer + '  </testsuite>\n'
    footer = footer + '</testsuites>\n'

    f = open('Test.xml', 'w')
    f.write(header)
    f.write(result)
    f.write(footer)

    print("------------------------------");
    print("finish Testing.");
    if(len(failed_tests) == 0):
        print("All test are passed.");
    else:
        i = 0
        print(str(failures) + " tests are failed.");
        while i < len(failed_tests):
            (case, t) = failed_tests[i]
            print("\t" + case + "." + t)
            i = i + 1
    return

def usage():
    print("Usage:")
    print("Reset Test Answer : " + sys.argv[0] + " --target=js,c --reset");
    print("Running TestCases : " + sys.argv[0] + " --target=js,c");
    exit(1);

if __name__ == '__main__':
    argc = len(sys.argv)
    if(argc < 2):
        usage()

    target = sys.argv[1][len("--tareget=")-1:].split(",");
    if(len(target) == 0):
        usage()

    if(argc > 2 and sys.argv[2] == "--reset"):
        generate();
    else:
        test();
