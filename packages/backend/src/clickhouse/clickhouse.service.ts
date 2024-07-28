import { ClickHouseClient, createClient } from '@clickhouse/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ResponseEvent } from 'src/types/ResponseEvent';
import * as E from 'fp-ts/Either';
import { CLICKHOUSE_FAILED_TO_SAVE_LOG } from 'src/errors';
import { DateTime } from 'luxon';

@Injectable()
export class ClickhouseService implements OnModuleInit {
  private clickhouseClient: ClickHouseClient;
  private EXPORT_FETCH_QUERY =
    'select event,timestamp,user,group,resource,statusCode,errorMessage,result,server_version from logs.audit_logs ORDER BY timestamp DESC';

  onModuleInit() {
    console.log('Initializing Clickhouse');
    this.clickhouseClient = createClient({
      host: process.env.CLICKHOUSE_HOST,
      username: process.env.CLICKHOUSE_USER,
      password: process.env.CLICKHOUSE_PASSWORD,
    });
  }

  async saveEvent(event: ResponseEvent) {
    try {
      await this.clickhouseClient.insert({
        table: 'events.insights',
        values: {
          event: event,
          timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        format: 'JSONEachRow',
      });
    } catch (e) {
      E.left(CLICKHOUSE_FAILED_TO_SAVE_LOG);
    }
  }
}
