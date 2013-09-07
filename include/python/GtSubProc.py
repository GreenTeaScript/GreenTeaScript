# current implementation only support single command
# pipe and redirect is not supported

import subprocess
import os
import datetime
import re

logdirPath = "/tmp/strace-log"


# shell Exception definition    ## TODO: support message
class NotPermittedException : pass
class TooManyLinkException : pass
class TooLongNameException : pass
class NotFoundException : pass
class NetworkTimeoutException : pass
class InterruptedBySignalException : pass
class UnreachableException : pass
class ConnectRefusedException : pass
class NoFreeSpaceException : pass
class ReadOnlyException : pass
class InvalidSeekException : pass


def createLogFileName():
	day = datetime.datetime.today()
	logDirName = logdirPath + "/"
	logDirName += str(day.year) + "-"
	logDirName += str(day.month) + "-"
	logDirName += str(day.day)
	try:
		os.makedirs(logDirName)
	except OSError:
		pass

	logFileName = logDirName + "/" + str(day.hour) + ":"
	logFileName += str(day.minute) + "-"
	logFileName += str(day.microsecond)
	logFileName += ".log"

	return logFileName


def appendCommand(cmdList):
	ret = ""
	for cmd in cmdList :
		ret += cmd + " "
	return ret


def deleteLogFile(logPath):
	os.remove(logPath)


def parseLine(line):
	headCount = 0
	openBracketCount = 0
	closeBracketCount = 0
	parsedSyscall = []
	parsedSyscallTemp = []
	sBuilder = ""

	lineLen = len(line)
	i = 0
	while i < lineLen :
		token = line[i]
		if token == '(' :
			if openBracketCount == 0 :
				parsedSyscallTemp.append(sBuilder)
				sBuilder = ""
			openBracketCount += 1
		elif token == ')' :
			closeBracketCount += 1
			if openBracketCount == closeBracketCount :
				parsedSyscallTemp.append(sBuilder)
				sBuilder = ""
				openBracketCount = closeBracketCount = 0
		else:
			if headCount < 2 :
				if token == ' ' :
					if i + 1 < lineLen and line[i + 1] != ' ' :
						headCount += 1
			else:
				sBuilder += token
		i += 1

	splitStrings = parsedSyscallTemp[2].strip().split()
	parsedSyscall.append(parsedSyscallTemp[0])
	parsedSyscall.append(parsedSyscallTemp[1])
	parsedSyscall.append(splitStrings[2])

	return parsedSyscall



def parseTraceLog(logPath):
	syscallStack = []
	pattern1 = "^[1-9][0-9]* .+(.+) *= *-[1-9].+"
	pattern2 = "^.+(.+/locale.+).+"

	f = open(logPath)
	lines = f.readlines()
	f.close()

	for line in lines :
		if re.match(pattern1, line) != None and re.match(pattern2, line) == None :
			syscallStack.append(parseLine(line))

	return syscallStack


def createException(msg, syscall):
	exceptionMap = {
		"E2BIG": None, 
		"EACCES": NotPermittedException(), 
		"EADDRINUSE": None, 
		"EADDRNOTAVAIL": None, 
		"EAFNOSUPPORT": None,
		"EAGAIN": None, 
		"EALREADY": None, 
		"EBADE": None, 
		"EBADF": None, 
		"EBADFD": None, 
		"EBADMSG": None, 
		"EBADR": None, 
		"EBADRQC": None, 
		"EBADSLT": None, 
		"EBUSY": None, 
		"ECANCELED": None, 
		"ECHILD": None, 
		"ECHRNG": None, 
		"ECOMM": None, 
		"ECONNABORTED": None,
		"ECONNREFUSED": ConnectRefusedException(), 
		"ECONNRESET": None, 
		"EDEADLK": None, 
		"EDEADLOCK": None, 
		"EDESTADDRREQ": None, 
		"EDOM": None,
		"EDQUOT": None, 
		"EEXIST": None, 
		"EFAULT": None, 
		"EFBIG": None, 
		"EHOSTDOWN": None, 
		"EHOSTUNREACH": None, 
		"EIDRM": None, 
		"EILSEQ": None,
		"EINPROGRESS": None, 
		"EINTR": InterruptedBySignalException(), 
		"EINVAL": None, 
		"EIO": None, 
		"EISCONN": None, 
		"EISDIR": None, 
		"EISNAM": None, 
		"EKEYEXPIRED": None,
		"EKEYREJECTED": None, 
		"EKEYREVOKED": None, 
		"EL2HLT": None, 
		"EL2NSYNC": None, 
		"EL3HLT": None, 
		"EL3RST": None, 
		"ELIBACC": None, 
		"ELIBBAD": None, 
		"ELIBMAX": None, 
		"ELIBSCN": None, 
		"ELIBEXEC": None, 
		"ELOOP": TooManyLinkException(), 
		"EMEDIUMTYPE": None, 
		"EMFILE": None, 
		"EMLINK": None, 
		"EMSGSIZE": None, 
		"EMULTIHOP": None, 
		"ENAMETOOLONG": TooLongNameException(), 
		"ENETDOWN": None, 
		"ENETRESET": None, 
		"ENETUNREACH": UnreachableException(), 
		"ENFILE": None, 
		"ENOBUFS": None, 
		"ENODATA": None, 
		"ENODEV": None, 
		"ENOENT": NotFoundException(), 
		"ENOEXEC": None, 
		"ENOKEY": None, 
		"ENOLCK": None, 
		"ENOLINK": None, 
		"ENOMEDIUM": None, 
		"ENOMEM": None, 
		"ENOMSG": None, 
		"ENONET": None, 
		"ENOPKG": None, 
		"ENOPROTOOPT": None, 
		"ENOSPC": NoFreeSpaceException(),
		"ENOSR": None, 
		"ENOSTR": None,
		"ENOSYS": None, 
		"ENOTBLK": None, 
		"ENOTCONN": None, 
		"ENOTDIR": None, 
		"ENOTEMPTY": None, 
		"ENOTSOCK": None, 
		"ENOTSUP": None, 
		"ENOTTY": None, 
		"ENOTUNIQ": None, 
		"ENXIO": None, 
		"EOPNOTSUPP": None, 
		"EOVERFLOW": None, 
		"EPERM": None, 
		"EPFNOSUPPORT": None, 
		"EPIPE": None, 
		"EPROTO": None, 
		"EPROTONOSUPPORT": None, 
		"EPROTOTYPE": None, 
		"ERANGE": None, 
		"EREMCHG": None, 
		"EREMOTE": None, 
		"EREMOTEIO": None,
		"ERESTART": None, 
		"EROFS": ReadOnlyException(), 
		"ESHUTDOWN": None, 
		"ESPIPE": InvalidSeekException(), 
		"ESOCKTNOSUPPORT": None, 
		"ESRCH": None, 
		"ESTALE": None, 
		"ESTRPIPE": None, 
		"ETIME": None, 
		"ETIMEDOUT": NetworkTimeoutException(), 
		"ETXTBSY": None, 
		"EUCLEAN": None, 
		"EUNATCH": None, 
		"EUSERS": None, 
		"EWOULDBLOCK": None, 
		"EXDEV": None, 
		"EXFULL": None
	}

	obj = exceptionMap[syscall[2]]
	if obj != None :
		raise(obj)
	else:
		raise(Exception("caused by " + syscall[2]))


def raiseException(logPath, cmdList, enableTrace):
	if enableTrace == False :
		raise Exception
	else:
		syscallStack = parseTraceLog(logPath)
		deleteLogFile(logPath)
		msg = appendCommand(cmdList)
		peek = syscallStack[len(syscallStack) - 1]
		createException(msg, peek)


def createSubProc(cmdList, isExpr):     # TODO: support pipe, redirect
	enableTrace = True     # if it is True, enbale systemcall trace
	exeCmdList = []
	logPath = createLogFileName()
	if enableTrace :
		straceCmds = ["strace", "-t", "-f", "-F", "-o", logPath]
		exeCmdList.extend(straceCmds)

	exeCmdList.extend(cmdList)
	retValue = {"stdout": None, "state": True}

	if isExpr :
		try:
			output = subprocess.check_output(exeCmdList)
			retValue["stdout"] = output
		except subprocess.CalledProcessError, e :
			retValue["state"] = False
			retValue["stdout"] = e.output
			raiseException(logPath, cmdList, enableTrace)

	else:
		try:
			subprocess.check_call(exeCmdList)
		except subprocess.CalledProcessError, e :
			retValue["state"] = False
			raiseException(logPath, cmdList, enableTrace)

	return retValue


def execCommandString(cmdList):
	retValue = createSubProc(cmdList, True)
	return retValue["stdout"]


def execCommandBool(cmdList):
	retValue = createSubProc(cmdList, False)
	return retValue["state"]


def execCommandVoid(cmdList):
	createSubProc(cmdList, False)


def main():
	# try:
		# ret = execCommandBool(["ls", "-la", "./"])
		# print ret
	# except NotPermittedException:
		# print "rasied NotPermittedException"
	# except NotFoundException:
		# print "raised NotFoundException"
	# finally:
		# pass

	try:
		raiseException("./log", ["hoge"], True)
	except UnreachableException, e:
		print "catch UnreachableException!!"
	except NetworkTimeoutException, e:
		print "catch NetworkTimeoutException!!"

	return 0


if __name__ == '__main__':
	main()
