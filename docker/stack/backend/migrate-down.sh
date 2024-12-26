#!/bin/sh
set -e

# Check if PostgreSQL is reachable
if ! psql "$POSTGRES_URL" -c '\q' 2>/dev/null; then
    echo "❌ Failed to connect to PostgreSQL database. Exiting."
    exit 1
fi

echo ""

# Run all migration files in order
for file in /app/src/migrations/*.down.sql; do
    if output=$(psql "$POSTGRES_URL" -v ON_ERROR_STOP=1 -q -f "$file" 2>&1); then
        echo "✅ Rollback $file applied successfully"
    else
        echo "❌ ERROR rolling back migration $file. Check logs for details:"
        echo "$output" >&2
        exit 1
    fi
done

echo "🛢️ Database rollbacks complete."
echo ""

exec "$@"
