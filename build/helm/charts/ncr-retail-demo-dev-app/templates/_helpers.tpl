{{- define "all-keys" }}
{{- range $key, $val := . }}
{{- if ne (printf "%v" $val) "<nil>" }}
{{ printf "%v" $key }}: {{ printf "%v" $val | quote }}
{{- end }}
{{- end }}
{{- end }}