package util

import "regexp"

func ReplaceAllSubmatchFunc(src string, re *regexp.Regexp, repl func(groups []string) string) string {
	matches := re.FindAllStringSubmatchIndex(src, -1)
	if matches == nil {
		return src
	}

	result := ""
	last := 0

	for _, match := range matches {
		start, end := match[0], match[1]

		var groups []string
		for i := 0; i < len(match); i += 2 {
			groups = append(groups, src[match[i]:match[i+1]])
		}

		result += src[last:start] + repl(groups)
		last = end
	}

	result += src[last:]
	return result
}
