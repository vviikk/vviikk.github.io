all: pdf

pdf: prepare
	@echo "Creating pdf output ..."
	@pwd
	@pandoc --latex-engine=xelatex README.md --output resume.pdf

prepare:

	@echo "Preparing ..."

