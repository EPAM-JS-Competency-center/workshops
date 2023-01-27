find ~+ -type f -name "config.toml" | while read line ; do
  # Exclude our example sites from theme from this build process
  if [[ $line == *"exampleSite"* ]]; then
    continue
  fi

  current_path=$(pwd)
  # absolute path to the workshop
  workshop_path=$(echo $line | tr "/" "\n" | sed '$d' | tr '\n' '/')
  # taking name of workshop based on folder structure
  title_of_workshop=$(echo $line | tr "/" "\n" | tail -3 | tr '\n' '/' | cut -d  '/' -f1)

  # # Move under that folder and build it
  cd $workshop_path
  hugo --minify --baseURL "$1/$2"
  cd $current_path

  # # Move build file under ./workshops folder since it's our final output for all of them
  mkdir -p $current_path/workshops/$title_of_workshop
  mv $workshop_path/public/* $current_path/workshops/$title_of_workshop
done
