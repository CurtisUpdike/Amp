using AppleDeveloperToken;

namespace WebApi.Services;

public class TokenProvider : ITokenProvider
{
    private readonly TokenGenerator _tokenGenerator;

    public TokenProvider(IConfiguration config)
    {
        ValidateConfiguration(config);
        _tokenGenerator = new(config["Apple:PrivateKey"]!,
                              config["Apple:TeamId"]!,
                              config["Apple:KeyId"]!);
    }

    public string Token
    {
        get
        {
            return _tokenGenerator.Generate(TimeSpan.FromDays(30));
        }
    }

    private static void ValidateConfiguration(IConfiguration config)
    {
        if (string.IsNullOrEmpty(config["Apple:PrivateKey"]))
        {
            throw new Exception("Apple:PrivateKey not found in configuration");
        }

        if (string.IsNullOrEmpty(config["Apple:TeamId"]))
        {
            throw new Exception("Apple:TeamId not found in configuration");
        }

        if (string.IsNullOrEmpty(config["Apple:KeyId"]))
        {
            throw new Exception("Apple:KeyId not found in configuration");
        }
    }
}
