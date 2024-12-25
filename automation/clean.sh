DIR=$1
CUTOFF_DATE=$(date -d '1 month ago' '+%Y%m%d')

for file in "$DIR"/*; do
  CREATED_DATE=$(echo "$file" | awk -F'cron_' '{print substr($2, 5, 4) substr($2, 1, 2) substr($2, 3, 2)}')
  
  if [[ "$CREATED_DATE" -lt "$CUTOFF_DATE" ]]; then
    echo delete file "$file"
    rm "$file"
  fi
done