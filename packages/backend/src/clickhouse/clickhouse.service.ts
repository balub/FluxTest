import { ClickHouseClient, createClient } from '@clickhouse/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ResponseEvent } from 'src/types/ResponseEvent';
import * as E from 'fp-ts/Either';
import {
  CLICKHOUSE_FAILED_TO_SAVE_LOG,
  CLICKHOUSE_QUERY_FAILED,
} from 'src/errors';
import { DateTime } from 'luxon';

@Injectable()
export class ClickhouseService implements OnModuleInit {
  private clickhouseClient: ClickHouseClient;

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
          projectId: event.projectId,
          componentId: event.componentId,
          data: JSON.stringify(event.data),
          timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        format: 'JSONEachRow',
      });
      return E.right(true);
    } catch (e) {
      return E.left(CLICKHOUSE_FAILED_TO_SAVE_LOG);
    }
  }

  async fetchData(projectID: string, componentID: string) {
    console.log('fetching data', projectID, componentID);
    try {
      const query = `
        SELECT *
        FROM events.insights
        WHERE projectId = ${projectID} 
        AND componentId = ${componentID} 
      `;

      const result = await this.clickhouseClient.query({
        query,
        format: 'JSONEachRow',
      });
      const dataset = await result.json();
      console.log('res', dataset);

      //TODO: component type data parsing

      return E.right(JSON.stringify(dataset, null, 2));
    } catch (e) {
      return E.left(CLICKHOUSE_QUERY_FAILED);
    }
  }
}
