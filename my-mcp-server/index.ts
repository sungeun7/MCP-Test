
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// AI가 호출할 수 있는 도구 등록
server.registerTool(
  "get_server_status",
  {
    description: "현재 서버 상태와 확인 시간을 반환합니다.",
    inputSchema: z.object({}),
  },
  async () => {
    const result = {
      status: "RUNNING",
      checkedAt: new Date().toISOString(),
      message: "MCP 서버가 정상적으로 응답했습니다.",
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

// MCP 통신 시작
void serveStdio(() => server);
